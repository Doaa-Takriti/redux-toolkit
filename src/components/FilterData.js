import React,{ useState ,useEffect,useMemo}  from 'react';


function FilterData() {
    let [filter1, setFilter1] = useState('all')
    let [data, setData] = useState(null);

    const [selectedCategory, setSelectedCategory] = useState();
    const [sortState, setSortState] = useState("none");
    const [sortPrice, setSortPrice] = useState("none");

    const [query, setQuery] = useState("");



  
    useEffect(() => {
      async function fetchData() {
        const response = await fetch(`http://localhost:5000/products?q=${query}`);
        const data = await response.json();
        setData(data);

     
      }
    
      if (query.length === 0 || query.length > 2) fetchData();
    }, [query]);
  
   
  
    function onFilter(event) {
        setFilter1(event.target.value)
        console.log(event.target.value)

    }
    const sortMethods = {
        none: { method: (a, b) => null },
        ascending:  { method: (a, b) => (a.name < b.name ? -1 : 1) },
        descending: { method: (a, b) => (a.name > b.name ? -1 : 1) },
      };
      const sortMethodsprice = {
        none: { method: (a, b) => null },
        high:  { method: (a, b) => (a.price < b.price ? -1 : 1) },
        low: { method: (a, b) => (a.price > b.price ? -1 : 1) },
      };


    /* let filterproductlist =  data.filter((product) => {
        if (filter1 === 'available') {
          return product.isAvailable === true
        } else if (filter1 === 'unavailable') {
          return product.isAvailable === false
    
    
        } else {
    
    
          return product
        }
    
      }) */
      function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
        console.log(event.target.value)
     }
     function getFilteredList() {
        if (!selectedCategory) {
          return data;
        }
        return data.filter((item) => item.category === selectedCategory
       );
      }
      var filteredList = useMemo(getFilteredList, [selectedCategory,data]);

      const handleBtns = (event) => {
        let word = event.target.value;
        if (word === 'all'){
            setData(data)
        }
        else if(word === 'iphone'){
            const filtered = data.filter(item => item.kind="iphone")
            setData(filtered)
            
           
        }
        else if(word === 'samsung'){
            const filtered = data.filter(item => item.kind="samsung")
            setData(filtered)

           
          
        } 
       

      } 
   
  return (
    <div>
         <input
          className="search"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
     
        <select name="isAvailable" onChange={onFilter}>
            <option value="all">all</option>
            <option value="available">available</option>
            <option value="unavailable">unavailable</option>

        </select>
        <select
        name="category-list"
        id="category-list"
        onChange={handleCategoryChange}
      >
         <option value="">All</option>
         <option value="Outdoor">Outdoor</option>
         <option value="Indoor">Indoor</option>
         <option value="Aquatics">Aquatics</option>
      </select>
<select defaultValue={'DEFAULT'}  onChange={(e) => setSortState(e.target.value)}>
        <option value="DEFAULT" disabled>None</option>
        <option value="ascending"  >Ascending</option>
        <option value="descending"  >Descending</option>
      </select>
      <select defaultValue={'none'}  onChange={(e) => setSortPrice(e.target.value)}>
        <option value="none" >None</option>
        <option value="low"  >from high to low</option>
        <option value="high"  >from low to high</option>
      </select>


        <div>
            <div>
              <button value="all" onClick={handleBtns} >all</button>
              <button value="iphone" onClick={handleBtns}>iphone</button>
              <button value="samsung" onClick={handleBtns}>samsung</button>


                </div>
                {data && (
        <div>
          {filteredList.filter((product) => {
        if (filter1 === 'available') {
          return product.isAvailable === true
        } else if (filter1 === 'unavailable') {
          return product.isAvailable === false
    
         
        } else {
    
    
          return (product)
        }
    
      }).sort(sortMethods[sortState].method).sort(sortMethodsprice[sortPrice].method).map(item => (
            <div key={item.id}>{item.name} {item.price}</div>
          ))}
        </div>
      )}
          
   
   
   
    </div>
    </div>
  )
}

export default FilterData