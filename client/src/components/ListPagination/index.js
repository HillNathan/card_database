import React from 'react'
import Pagination from '@material-ui/lab/Pagination';

export default function ListPagination (props) {
    // props passed in are as follows:
    //
    //   numPages - integer telling how many pages we are displaying
    //   updateCurrentPage - function to update the page in the higher state
    //   
    
    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
        props.updateCurrentPage(value)
    };

    return(
        <Pagination
            count={props.numPages}
            defaultPage={6} 
            siblingCount={0} 
            boundaryCount={2}
            page={page}
            onChange={handleChange}
        />
    )
}