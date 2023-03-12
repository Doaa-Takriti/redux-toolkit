import { useEffect, useState } from "react";
function Filter1() {

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [tag, setTag] = useState('all');

  useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:5000/products')
      .then(res => {
        if (!res.ok) { 
          throw Error('could not fetch the data for that resource');
        } 
        return res.json();
      })
      .then(data => {
        setIsPending(false);
        tag === 'all' ? setData(data) : setData(data.filter(image => image.kind === tag));

        setError(null);

      })
      .catch(err => {
        // auto catches network / connection error
        setIsPending(false);
        setError(err.message);
      })
    }, 10);
  }, [tag])




  return (
    <div className="App">
      <div className="galleryWrapper">
        <div className="filterItem">
          	<div className="tags">
				<TagButton name="all" tagActive={tag === 'all' ? true : false} handleSetTag={setTag} /> /
				<TagButton name="iphone" tagActive={tag === 'iphone' ? true : false} handleSetTag={setTag} /> /
				<TagButton name="samsung" tagActive={tag === 'samsung' ? true : false} handleSetTag={setTag} /> /
			</div>
 
        </div>
        <div className="galleryContainer">
        { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
    
          {data &&
           
           data.map((item)=> <div  key={item.id} className="galleryItem">{item.category}</div> )
          }
        </div>
      </div>
    </div>

  );
 
}
const TagButton = ({ name, handleSetTag, tagActive }) => {
	return (
		<button className={`tag ${tagActive ? 'active' : null}`} onClick={() => handleSetTag(name)}>
			{name.toUpperCase()}
		</button>
	);
};

export default Filter1;