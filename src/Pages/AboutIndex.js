export default function AboutIndex(){
    return <>
    <div className="row mt-5 p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
        <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
            <h1 className="display-4 fw-bold lh-1">About</h1>
            <p className="lead">Mercator is a modern and minimalist online store creator, designed to be used by anyone. Get started with 1 free store and 10 products.</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
                <button type="button" className="btn btn-dark btn-lg px-4 me-md-2 fw-bold">Get started</button>
            </div>
        </div>
        <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
            <img className="rounded-lg-3" src="/hero_image.png" alt="" width="720"/>
        </div>
    </div>
    </>
}