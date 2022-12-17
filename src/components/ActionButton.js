import { Box, Button, CircularProgress, Fab } from '@mui/material';
import { useEffect, useState } from 'react';
import { Check, SaveTwoTone  } from '@mui/icons-material';
import { green } from '@mui/material/colors';
import axios from 'axios';

const ActionButton = ( {params,rowId, setRowId }) => {
    
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // console.log(params.row)

    const handleSubmit = async () => {
      setLoading(true);
  const updatedRow = params.row
      const result = await axios.put(`https://fakestoreapi.com/users/${rowId}`, updatedRow);
      if (result) {
        setSuccess(true);
        setRowId(null);
      }
    console.log(result)
      setLoading(false);
    };
  
    useEffect(() => {
      if (rowId === params.id && success) setSuccess(false);
    }, [rowId]);
  
    return (
      <Box
        sx={{
          m: 1,
          position: 'relative',
        }}
      >
        {success ? (
          <Button
            color="success"
            variant="outlined"
            sx={{
              width: 40,
              height: 40,
            }}
          >
            Saved
          </Button>
        ) : (
          <Button
            color="primary"
            variant="outlined"
            sx={{
              width: 40,
              height: 40,
              position: 'relative'
            }}
            disabled={params.id !== rowId || loading}
            onClick={handleSubmit}
          >
            Save
            {loading && (
              <CircularProgress
                size={35}
                sx={{
                  color: green[500],
                  position: 'absolute',
                  zIndex: 1,
                }}
              />
            )}
          </Button>
        )}
      </Box>
    );
}

export default ActionButton
