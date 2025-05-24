import AdminOrders from "../features/admin/components/AdminOrders";
import Footer from "../features/common/Footer";
import NavBar from "../features/navbar/Navbar";

function AdminOrdersPage() {
    return ( 
        <div >
            <NavBar>
                <AdminOrders>e</AdminOrders>
            </NavBar>
            <Footer/>
        </div>
    );
}

export default AdminOrdersPage;