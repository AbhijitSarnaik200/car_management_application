import { useEffect, useState } from "react";

import Layout from "../components/Layout";

import {
  Users,
  CarFront,
  ShieldCheck,
} from "lucide-react";

function AdminDashboard() {

  const [stats, setStats] =
    useState({

      totalUsers: 0,

      totalCars: 0,

    });

  // Fetch Admin Stats
  const fetchStats = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/users/admin/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setStats(data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchStats();

  }, []);

  return (

    <Layout>

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold text-gray-800 dark:text-white">

            Admin Dashboard 👑

          </h1>

          <p className="text-gray-500 mt-3 text-lg">

            Manage your entire platform

          </p>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Total Users */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl hover:scale-105 transition duration-300">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">

                  Total Users

                </p>

                <h2 className="text-5xl font-bold text-blue-600 mt-4">

                  {stats.totalUsers}

                </h2>

              </div>

              <Users
                size={55}
                className="text-blue-500"
              />

            </div>

          </div>

          {/* Total Cars */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl hover:scale-105 transition duration-300">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">

                  Total Cars

                </p>

                <h2 className="text-5xl font-bold text-green-500 mt-4">

                  {stats.totalCars}

                </h2>

              </div>

              <CarFront
                size={55}
                className="text-green-500"
              />

            </div>

          </div>

          {/* Admin Access */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl hover:scale-105 transition duration-300">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">

                  Admin Access

                </p>

                <h2 className="text-4xl font-bold text-purple-600 mt-4">

                  Active

                </h2>

              </div>

              <ShieldCheck
                size={55}
                className="text-purple-500"
              />

            </div>

          </div>

        </div>

      </div>

    </Layout>

  );

}

export default AdminDashboard;