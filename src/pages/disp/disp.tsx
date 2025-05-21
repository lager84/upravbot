import DispListItems from "../../components/disp-list-items/Disp-list-items";



const DispPage = () => {



    return (
       <div className="row w-100 m-0 min-vh-100">
        <div className="col-sm-12 p-0">

            <div className="row p-4 m-0">
                <div className="col-lg-12 col-sm-12">

                    <div className="flexHoriz flex-wrap bgWhite rounded16 w-100 p-4 dispList">

                        <div className="flexHoriz w-100 mb-4">
                            <h3 className="font18b " id="PageH">Диспетчерские</h3>
                         
                        </div>
                       
                       <DispListItems/>

                    
                </div>
            </div>
        </div>
    </div>
    </div>
    
    );
}
export default DispPage