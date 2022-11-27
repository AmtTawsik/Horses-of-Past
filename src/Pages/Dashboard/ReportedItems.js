import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Loading from '../Shared/Loading';

const ReportedItems = () => {

    const {
        data: reportedItems = [],
        refetch,
        isLoading,
      } = useQuery({
        queryKey: ["reportedItems"],
        queryFn: async () => {
          const res = await fetch(`http://localhost:5000/report`);
          const data = await res.json();
          return data;
        },
      });

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/myproduct/${id}`, {
              method: "DELETE",
            })
              .then((res) => res.json())
              .then((data) => {
                if(data.deletedCount > 0){
                  toast.success('Deleted Successfully')
                  refetch();
                }
              });
      };
      if(isLoading){
        <Loading></Loading>
      }
    //   console.log(reportedItems)
    return (
        <div>
      <h2 className="text-4xl text-center font-bold mb-5">Reported Items</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th className="text-3xl">Product Name</th>
              <th className="text-3xl">Category Name</th>
              <th className="text-3xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {reportedItems.map((items, idx) => (
              <tr key={idx}>
                <td>{idx + 1}.</td>
                <td>
                  <span className="text-3xl">{items.productName}</span>
                </td>
                <td>
                  <span className="text-3xl">{items.categoryName}</span>
                </td>
                
                <td>
                  <button onClick={()=>handleDelete(items._id)} className="btn btn-sm  btn-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
    );
};

export default ReportedItems;