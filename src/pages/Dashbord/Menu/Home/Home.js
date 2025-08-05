import React from 'react';
import { FaUsers, FaBoxOpen, FaUtensils, FaEnvelope, FaBriefcase, FaCheckCircle, FaUserCog, FaQuestionCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { firestore } from '../../../../config/firebase'

export default function Home() {
  // orders 
  const [recentOrders, setRecentOrders] = useState([]);

  // messages
  const [recentMessages, setRecentMessages] = useState([]);

  // statcarts
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    users: 0,
    menuItems: 0,
    messages: 0,
    applicants: 0,
    team: 0,
    vacancies: 0,
  });
  // fatch recent orders
  useEffect(() => {
    const fetchRecentOrders = async () => {
      const q = query(
        collection(firestore, 'carts'),
        orderBy('dateSended', 'desc'),  // Make sure 'date' field exists
        limit(5)
      );

      const snapshot = await getDocs(q);
      const orders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRecentOrders(orders);
    };

    fetchRecentOrders();
  }, []);

  // fatch the messages 
  useEffect(() => {
    const fetchMessages = async () => {
      const q = query(
        collection(firestore, 'Messages'),
        orderBy('dateSended', 'desc'),
        limit(5)
      );
      const snapshot = await getDocs(q);
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecentMessages(msgs);
    };

    fetchMessages();
  }, []);


  // fatch the data for stats statCarts
  useEffect(() => {
    const fetchData = async () => {
      // Orders
      const ordersSnapshot = await getDocs(collection(firestore, 'carts'));
      const orders = ordersSnapshot.docs.map(doc => doc.data());

      const pending = orders.filter(o => o.status === 'pending').length;
      const completed = orders.filter(o => o.status === 'done' || o.status === 'Completed').length;

      // Other collections for statCrds
      const usersCount = (await getDocs(collection(firestore, 'users'))).size;
      const productsCount = (await getDocs(collection(firestore, 'Products'))).size;
      const messagesCount = (await getDocs(collection(firestore, 'Messages'))).size;
      const applicantsCount = (await getDocs(collection(firestore, 'applicants'))).size;
      const teamCount = (await getDocs(collection(firestore, 'Team'))).size;
      const vacanciesCount = (await getDocs(collection(firestore, 'jobs'))).size;

      // statCards
      setStats({
        totalOrders: orders.length,
        pendingOrders: pending,
        completedOrders: completed,
        users: usersCount,
        menuItems: productsCount,
        messages: messagesCount,
        applicants: applicantsCount,
        team: teamCount,
        vacancies: vacanciesCount,
      });
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="container py-4 admin-dashboard">
        {/* Welcome */}
        <div className="row mb-4">
          <div className="col-12">
            <h4 className="fw-bold">Welcome to DineFlow Admin Dashboard</h4>
            <p className="text-muted">Manage your restaurant efficiently from here.</p>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="row g-4 mb-4">
          <StatCard icon={<FaBoxOpen />} title="Total Orders" value={stats.totalOrders} color="primary" to="/dashbord/home/orders" />
          <StatCard icon={<FaCheckCircle />} title="Completed Orders" value={stats.completedOrders} color="secondary" to="/dashbord/home/orders?status=done" />
          <StatCard icon={<FaBoxOpen />} title="Pending Orders" value={stats.pendingOrders} color="pending" to="/dashbord/home/orders" />


          <StatCard icon={<FaUsers />} title="Total Users" value={stats.users} color="success" to='/dashbord/home/users' />
          <StatCard icon={<FaUtensils />} title="Menu Items" value={stats.menuItems} color="danger" to='/dashbord/home/allProducts' />
          <StatCard icon={<FaEnvelope />} title="Messages" value={stats.messages} color="warning" to='/dashbord/home/messages' />
          <StatCard icon={<FaUserCog />} title="Team Members" value={stats.team} color="dark" to='/dashbord/home/team' />
          <StatCard icon={<FaBriefcase />} title="Job Applicants" value={stats.applicants} color="info" to='/dashbord/home/viewApplicant' />
          <StatCard icon={<FaBriefcase />} title="Jobs / Vacancies" value={stats.vacancies} color="vacancy" to='/dashbord/home/addJob' />

        </div>




        {/* Recent Orders */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card shadow-sm p-3">
              <h5 className="mb-3">Recent Orders</h5>
              <table className="table table-striped table-hover mb-0">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Time</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.length > 0 ? (
                    recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.orderId}</td>
                        <td>
                          {order.dateSended?.toDate
                            ? order.dateSended.toDate().toLocaleString()
                            : "N/A"}
                        </td>
                        <td>{order.billing?.firstName} {order.billing?.lastName}</td>
                        <td>
                          <span className={`badge ${order.status === "pending" ? "bg-warning" :
                            order.status === "done" || order.status === "completed" ? "bg-success" :
                              order.status === "on the way" ? "bg-info" : "bg-secondary"
                            }`}>
                            {order.status || "Unknown"}
                          </span>
                        </td>
                        <td>RS {order.grandTotal}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-muted text-center">No recent orders found.</td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>
          </div>
        </div>


        {/* Messages Preview */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card shadow-sm p-3">
              <h5 className="mb-3">Recent Messages</h5>
              <ul className="list-group list-group-flush">
                {recentMessages.length > 0 ? (
                  recentMessages.map((msg) => (
                    <li key={msg.id} className="list-group-item d-flex justify-content-between">
                      <span>
                        <strong>{msg.firstName} {msg.lastName}:</strong>{" "}
                        {msg.message?.slice(0, 60)}...
                      </span>
                      <Link to="/dashbord/home/messages" className="text-decoration-none">View</Link>
                    </li>
                  ))
                ) : (
                  <li className="list-group-item text-muted">No recent messages.</li>
                )}
              </ul>
            </div>
          </div>
        </div>


        {/* Quick Links */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card shadow-sm p-3">
              <h5 className="mb-3">Quick Access</h5>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/dashbord/home/orders" className="btn btn-outline-primary"><FaBoxOpen className="me-1" /> Manage Orders</Link>
                <Link to="/dashbord/home/users" className="btn btn-outline-success"><FaUsers className="me-1" /> Manage Users</Link>
                <Link to="/dashbord/home/allProducts" className="btn btn-outline-danger"><FaUtensils className="me-1" /> Manage Menu</Link>
                <Link to="/dashbord/home/viewApplicant" className="btn btn-outline-info"><FaBriefcase className="me-1" /> Job Applicants</Link>
                <Link to="/dashbord/home/messages" className="btn btn-outline-warning"><FaEnvelope className="me-1" /> Messages</Link>
                <Link to="/dashbord/home/faqs" className="btn btn-outline-secondary"><FaQuestionCircle className="me-1" /> FAQs</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Reusable Stat Card Component
function StatCard({ icon, title, value, color, to }) {
  return (
    <div className="col-12 col-sm-6 col-lg-4">
      <Link to={to || "#"} className='nav-link' style={{ textDecoration: 'none' }}>
        <div className={`stat-card color-${color}`}>
          <div className="card-content d-flex align-items-center">
            <span className={`icon text-${color}`}>{icon}</span>
            <div>
              <h5 className="mb-0">{title}</h5>
              <h6 className="">
                {value !== 0 ? (
                  value
                ) : (
                  <span className="spinner-border spinner-border-sm text-muted" role="status"></span>
                )}
              </h6>

            </div>
          </div>
          <span className="border-anim top"></span>
          <span className="border-anim right"></span>
          <span className="border-anim bottom"></span>
          <span className="border-anim left"></span>
        </div>
      </Link>
    </div>
  );
}

