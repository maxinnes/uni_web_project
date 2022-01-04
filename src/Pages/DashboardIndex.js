import {useEffect, useState} from "react";
import {Chart} from 'chart.js/dist/Chart.bundle.min'

export default function DashboardIndex(){
    let [listOfOrderComponents,setListOfOrderComponents] = useState([])

    // Custom components
    const AccountOrder = (props)=>{
        return <tr>
            <td>{props.orderId}</td>
            <td>{props.orderDate}</td>
            <td>{props.orderPrice}</td>
            <td>{props.orderStatus}</td>
        </tr>
    }

    const getAllAccountOrders = async ()=>{
        const myHeaders = new Headers();
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        const response = await fetch("/api/orders/getAllAccountOrders.php", requestOptions)
        const jsonResponse = await response.json()
        if(jsonResponse.messageType==="SUCCESS"){
            let tempList = []
            for(let x in jsonResponse.result){
                let currentOrderDetails = jsonResponse.result[x]
                tempList.push(<AccountOrder key={x} orderId={currentOrderDetails.orderId} orderDate={currentOrderDetails.createdDate} orderPrice={currentOrderDetails.totalPrice} orderStatus={currentOrderDetails.status}/>)
            }
            setListOfOrderComponents(tempList)

            return jsonResponse.result
        }
    }

    useEffect(()=>{
        getAllAccountOrders().then((x)=>{
            // Get past week dates
            let chartXDates = []
            for(let i = 7; i !== 0; i--){
                let tempDate = new Date()
                tempDate.setDate(tempDate.getDate()-i)
                let dateString = `${tempDate.getDate()}/${tempDate.getMonth()+1}/${tempDate.getFullYear()}`
                chartXDates.push(dateString)
            }

            let chartData = []
            for(let i = 7; i !== 0; i--){
                let tempDate = new Date()
                tempDate.setDate(tempDate.getDate()-i)
                let dateString = `${tempDate.getDate()}/${tempDate.getMonth()+1}/${tempDate.getFullYear()}`

                let totalSales = 0
                for(let y in x){
                    let convertDate = Date.parse(x[y].createdDate)
                    let orderDateObj = new Date(convertDate)
                    let orderDate = `${orderDateObj.getDate()}/${orderDateObj.getMonth()+1}/${orderDateObj.getFullYear()}`
                    if(orderDate===dateString){
                        totalSales = totalSales+x[y].totalPrice
                    }
                }
                chartData.push(totalSales)
            }

            // Graphs
            let ctx = document.getElementById('orderChart')
            // eslint-disable-next-line no-unused-vars
            let myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: chartXDates,
                    datasets: [{
                        data: chartData,
                        lineTension: 0,
                        backgroundColor: 'transparent',
                        borderColor: '#007bff',
                        borderWidth: 4,
                        pointBackgroundColor: '#007bff'
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    },
                    legend: {
                        display: false
                    }
                }
            })
        })
    },[])

    return <>
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h2>Dashboard</h2>
    </div>

    <canvas className="my-4 w-100" id="orderChart" width="900" height="380"/>

    <h2>Orders</h2>
    <div className="table-responsive">
        <table className="table table-striped table-sm">
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Date</th>
                <th scope="col">Price</th>
                <th scope="col">Status</th>
            </tr>
            </thead>
            <tbody>
                {listOfOrderComponents}
            </tbody>
        </table>
    </div>
    </>
}