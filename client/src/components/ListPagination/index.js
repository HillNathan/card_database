import React from 'react'
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));


export default function ListPagination (props) {
    // props passed in are as follows:
    //
    //   numPages - integer telling how many pages we are displaying
    //   updateCurrentPage - function to update the page in the higher state
    //   

    const classes = useStyles();
    
    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
        props.updateCurrentPage(value)
    };

    return(
        <Pagination
            count={props.numPages}
            color="secondary"
            defaultPage={6} 
            siblingCount={0} 
            boundaryCount={2}
            page={page}
            onChange={handleChange}
        />
    )
}