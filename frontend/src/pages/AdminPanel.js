import {postStore} from '../store/postStore'
import CreatePost from '../components/CreatePost';
import UpdatePost from '../components/UpdatePost';
import DeletePost from '../components/DeletePost';

const AdminPanel = () => {

    const {create, setCreate, update, deleteState, setUpdate, setDeleteState, isAdmin, setIsAdmin } = postStore()
    // console.log(isAdmin);
    console.log('adminPanel',update);

    return (
        <div className='h-100 mt-4'>
            <div className='row gx-0'>
                <h2 className='text-center' style={{color: "#219ebc"}}>Hello Admin</h2>
                <div className="col-12 col-sm-4 col-md-3 mt-2 mx-auto d-flex justify-content-center">
                    <button type='button' className='btn btn-primary' onClick={()=>setIsAdmin(!isAdmin)}>Admin State Toggle</button>
                </div>
                <h4 className='text-center mt-2'>Admin status - {isAdmin ? <span className='text-success'>ON</span> : <span className='text-secondary'>OFF</span>}</h4>
            </div>
            <div className="row gx-0 p-4">
                <div className="col-12 d-flex justify-content-center">
                    <div className="row w-50">
                    <div className="col-12 col-sm-4 col-md-3 mt-2 mx-auto d-flex justify-content-center">
                        <button className="btn btn-primary w-100"
                            onClick={() => {
                                if(!create){
                                    setCreate(true);
                                    setUpdate(false);
                                    setDeleteState(false);
                                } else{
                                    setCreate(false);
                                }
                            }}>Create
                        </button>
                    </div>
                    <div className="col-12 col-sm-4 col-md-3 mt-2 mx-auto d-flex justify-content-center">
                        <button className="btn btn-warning w-100"
                            onClick={() => {
                                if(!update) {
                                    setUpdate(true);
                                    setCreate(false);
                                    setDeleteState(false);
                                } else {
                                    setUpdate(false);
                                }
                            }}>Update
                        </button>
                    </div>
                    <div className="col-12 col-sm-4 col-md-3 mt-2 mx-auto d-flex justify-content-center">
                        <button className="btn btn-danger w-100"
                            onClick={() => {
                                if(!deleteState){
                                    setDeleteState(true);
                                    setUpdate(false);
                                    setCreate(false);
                                } else{
                                    setDeleteState(false);
                                }
                            }}>Delete
                        </button>
                    </div>
                    </div>
                </div>
                </div>
                {isAdmin && create && <CreatePost/>}
                {isAdmin && update && <UpdatePost/>}
                {isAdmin && deleteState && <DeletePost/>}
        </div>
    )
}

export default AdminPanel