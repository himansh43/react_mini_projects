import '../App.css'

const Pagination = ({pageNo,setPageNo}) => {

    const prevThreeArr= Array.from({length:3},(_,index)=>pageNo-1-index).filter((item)=>item>0).reverse()
    const nextFourArr=Array.from({length:4},(_,index)=>pageNo+index)
    console.log("prevthree arr", prevThreeArr)
    console.log("nextFourArr arr", nextFourArr)
    const paginationArr=[...prevThreeArr,...nextFourArr]
    const handlePrevBtn=()=>{
        if(pageNo>1){
            setPageNo((prev)=>prev-1)
        }
    }
    const handleNextBtn=()=>{
        setPageNo((prev)=>prev+1)
    }
  return (
    <div className="flex gap-3 justify-center items-center mt-10">
      <div className="flex gap-3">
        <button className=" cursor-pointer rounded-sm px-3 py-1 bg-black text-white w-15 h-8" onClick={handlePrevBtn}>Prev</button>
        {
            paginationArr.map((item)=>(
                <button key={item} className={` cursor-pointer rounded-sm px-3 py-1 w-12 h-8 bg-black text-white ${item===pageNo?"active":""}`} onClick={()=>setPageNo(item)}>{item}</button>
            ))
        }
        <button className="px-3 w-15 h-8 rounded-sm py-1 bg-black text-white cursor-pointer" onClick={handleNextBtn}>Next</button>
      </div>
    </div>
  );
};
export default Pagination;
