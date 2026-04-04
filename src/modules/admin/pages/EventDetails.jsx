// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getEventById, getServicesByEventId, getServiceVendors, assignVendor} from "../services/eventService";
// import StatusBadge from "../components/StatusBadge";

// const EventDetails = () => {
//   const { id } = useParams(); // get event id from URL
//   const [event, setEvent] = useState(null);
//   const [services, setServices] = useState([]);
//   const [selectedService, setSelectedService] = useState(null);
//   const [vendors, setVendors] = useState([]);
//   const [selectedVendor, setSelectedVendor] = useState("");
//   const [loading, setLoading] = useState(true);


//   const handleAssignClick = async (service) => {
//     setSelectedService(service);
//     console.log("Selected service: ",service);

//     const vendorList = await getServiceVendors(service.serviceTypeId);
//     setVendors(vendorList);
//     console.log(" Available vendors of the sevices",vendorList);
//   };

//   const handleAssignVendor = async () => {
//     if (!selectedVendor) return alert("Please select a vendor");

//     await assignVendor(id, selectedService.serviceTypeId, selectedVendor);

//     // refresh data
//     await fetchEventData();

//     // reset modal
//     setSelectedService(null);
//     setSelectedVendor("");
//   };

//   const fetchEventData = async () => {
//     setLoading(true);
//     try {
//       const eventData = await getEventById(id); // fetch event details
//       setEvent(eventData);
//       console.log(eventData);

//       const servicesData = await getServicesByEventId(id);
//       setServices(servicesData);
//       console.log(servicesData);

//     } catch (err) {
//       console.error(err);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchEventData();
//   }, [id]);

//   if (loading) return <div>Loading...</div>;
//   if (!event) return <div>Event not found</div>;

//   return (
//     <div className="space-y-4">
//       <h1 className="text-2xl font-bold">{event.title}</h1>
//       <p>{event.description}</p>
//       <p><b>Category:</b> {event.category}</p>
//       <p><b>Organizer:</b> {event.collegeName}</p>
//       <p><b>Date:</b> {new Date(event.eventDate).toLocaleDateString()}</p>
//       <p><b>Max Participants:</b> {event.maxParticipants}</p>
//       <p><b>Status:</b> <StatusBadge status={event.status} /></p>

//       {/* Services */}
//       <div>
//         <h2 className="text-xl font-semibold mt-6">Services</h2>
        
//         {services.length === 0 ? (
//           <p className="text-gray-500 italic font-semibold bg-gray-100 p-3 rounded">
//             This event does not require any service
//           </p>
//         ) : (
//           services.map(s => (
//             <div key={s.id} className="p-3 border rounded mb-3 flex justify-between items-center">
            
//             <div>
//               {s.serviceName} - Vendor: {s.vendor || "Not assigned"}
//             </div>

//             <button
//           onClick={() => handleAssignClick(s)}
//           className="px-3 py-1 bg-blue-500 text-white rounded"
//         >
//           Assign Vendor
//         </button>
//             </div>
//           ))
//         )}
//       </div>

//       {selectedService && (
//         <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          
//           <div className="bg-white p-6 rounded w-96">
//             <h3 className="text-lg font-semibold mb-4">
//               Assign Vendor for {selectedService.serviceName}
//             </h3>

//             <select
//               className="w-full border p-2 mb-4"
//               value={selectedVendor}
//               onChange={(e) => setSelectedVendor(e.target.value)}
//             >
//               <option value="">Select Vendor</option>
//               {vendors.map((v) => (
//                 <option key={v.id} value={v.id}>
//                   {v.businessName}
//                 </option>
//               ))}
//             </select>

//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => setSelectedService(null)}
//                 className="px-3 py-1 bg-gray-400 text-white rounded"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleAssignVendor}
//                 className="px-3 py-1 bg-green-500 text-white rounded"
//               >
//                 Assign
//               </button>
//             </div>
//           </div>

//         </div>
//       )}

//     </div>

    
//   );
// };

// export default EventDetails;


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getEventById,
  getServicesByEventId,
  getServiceVendors,
  assignVendor,
} from "../services/eventService";
import StatusBadge from "../components/StatusBadge";

const EventDetails = () => {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [loading, setLoading] = useState(true);

  // 👉 Open modal + fetch vendors
  const handleAssignClick = async (service) => {
    setSelectedService(service);

    const vendorList = await getServiceVendors(service.serviceTypeId);
    setVendors(vendorList);

    // ✅ Preselect current vendor (for change case)
    const currentVendor = vendorList.find(
      (v) => v.businessName === service.vendor
    );

    setSelectedVendor(currentVendor ? currentVendor.id : "");
  };

  // 👉 Assign / Change / Remove vendor
  const handleAssignVendor = async () => {
    await assignVendor(
      id,
      selectedService.serviceTypeId,
      selectedVendor || null // 🔥 handles remove
    );

    await fetchEventData();

    setSelectedService(null);
    setSelectedVendor("");
  };

  // 👉 Fetch event + services
  const fetchEventData = async () => {
    setLoading(true);
    try {
      const eventData = await getEventById(id);
      setEvent(eventData);

      const servicesData = await getServicesByEventId(id);
      setServices(servicesData);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEventData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{event.title}</h1>
      <p>{event.description}</p>
      <p><b>Category:</b> {event.category}</p>
      <p><b>Organizer:</b> {event.collegeName}</p>
      <p><b>Date:</b> {new Date(event.eventDate).toLocaleDateString()}</p>
      <p><b>Max Participants:</b> {event.maxParticipants}</p>
      <p><b>Status:</b> <StatusBadge status={event.status} /></p>

      {/* ✅ Services Section */}
<div>
  <h2 className="text-xl font-semibold mt-6">Services</h2>

  {services.length === 0 ? (
    <p className="text-gray-500 italic font-semibold bg-gray-100 p-3 rounded">
      This event does not require any service
    </p>
  ) : (
    <table className="w-full border border-gray-300 mt-3">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 border">Service</th>
          <th className="p-2 border">Vendor</th>
          <th className="p-2 border">Action</th>
        </tr>
      </thead>

      <tbody>
        {services.map((s) => (
          <tr key={s.id} >
            
            <td className="p-2 border">
              {s.serviceName}
            </td>

            <td className="p-2 border">
              {s.vendor || "Not assigned"}
            </td>

            <td className="p-2 border text-center">
              <button
                onClick={() => handleAssignClick(s)}
                className="px-3 py-1 bg-blue-500 text-white rounded "
              >
                {s.vendor ? "Change Vendor" : "Assign Vendor"}
              </button>
            </td>

          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

{/* ✅ Modal (UNCHANGED) */}
{selectedService && (
  <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
    <div className="bg-white p-6 rounded w-96">
      <h3 className="text-lg font-semibold mb-4">
        Assign Vendor for {selectedService.serviceName}
      </h3>

      <select
        className="w-full border p-2 mb-4"
        value={selectedVendor}
        onChange={(e) => setSelectedVendor(e.target.value)}
      >
        <option value="">Remove Vendor</option>

        {vendors.map((v) => (
          <option key={v.id} value={v.id}>
            {v.businessName}
          </option>
        ))}
      </select>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setSelectedService(null)}
          className="px-3 py-1 bg-gray-400 text-white rounded"
        >
          Cancel
        </button>

        <button
          onClick={handleAssignVendor}
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default EventDetails;