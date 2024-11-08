import DateRangePicker from '@/components/common/DateRangePicker';
import { Box, Container, Typography, Chip, Avatar } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbarContainer } from '@mui/x-data-grid';
import { endOfDay, isWithinInterval, startOfDay, subMonths } from 'date-fns';
import moment from 'moment';
import React, {  useMemo, useState } from 'react';
import { DateRange, Dropdown } from 'react-day-picker';
import mockData from '../UsersTable/MockUsers.json'
import { User } from './types';


const UsersTable: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subMonths(new Date(), 6),
    to: new Date(),
  })



  const filteredUsers = useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) return mockData;

    const start = startOfDay(dateRange.from);
    const end = endOfDay(dateRange.to);

    return mockData.filter(user => {
      const registrationDate = new Date(user.registrationDate);
      return isWithinInterval(registrationDate, { start, end });
    });
  }, [dateRange]);

  const columns: GridColDef[] = [
    {
      field: 'avatar',
      headerName: 'User Details',
      width: 400,
      renderCell: (params: GridRenderCellParams<any, User>) => (
        <div className='flex space-x-4 items-center'>
         <Avatar 
               
               sx={{ 
                 cursor: 'pointer',
                 width: 40, 
                 height: 40 
               }}
             >
               {params.row.username.charAt(0)}
             </Avatar>
          <span>{params.row.username}</span>
        </div>
      )
    },
    {
      field: 'username',
      headerName: 'Customer Name',
      width: 200,
      renderCell: (params: GridRenderCellParams<any, User>) => {
        const username = params.row.username;
        const registrationDate = params.row.registrationDate
          ? moment(params.row.registrationDate).format('DD.MM.YYYY')
          : 'No date available';
          
        return (
          <div>
            <Typography>{username}</Typography>
            <Typography variant="body2" color="textSecondary">
              {registrationDate}
            </Typography>
          </div>
        );
      },
    },
    {
      field: 'registrationDate',
      headerName: 'Date',
      flex: 1,
      renderCell: (params: GridRenderCellParams) =>
        moment(params.value as string).format('DD.MM.YYYY'),
    },
    {
      field: 'segment',
      headerName: 'Segment',
      width: 150,
      renderCell: (params: GridRenderCellParams<any, User>) => {
        const registrationDate = moment(params.row.registrationDate);
        const isNew = moment().diff(registrationDate, 'months') <= 6; // "New" if within 6 months

        return (
          <Chip
            label={isNew ? 'New' : 'Old'}
            sx={{
              backgroundColor: isNew ? '#29CC97' : 'default',
              color: '#fff',
              fontWeight: 'bold',
              padding: '2px 10px',
              borderRadius: '12px',
            }}
            size="small"
          />
        );
      },
    }
  ];
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
         <Typography variant="h6" color="textPrimary">
              All Users
            </Typography>
      </GridToolbarContainer>
    );
  }
  
  return (
    
   <>
      
      <Box
            sx={{
              marginTop: 5,
              flexGrow: 1,
              py: 8,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 2,
              marginBottom: 3,
              
             
            }}
          >
           <Container maxWidth={false}>
              <Box
               sx={{
                marginTop: 5,
                flexGrow: 1,
                py: 8,
                display: 'flex',
                justifyContent: 'end',
                alignItems: 'center',
                padding: 0,
                marginBottom: 3,
                
              }}>
                 <DateRangePicker 
        dateRange={dateRange} 
        onDateRangeChange={setDateRange}
      />  

              </Box>
          
         
              <DataGrid
  rows={filteredUsers}
  slots={{
    toolbar: CustomToolbar,
  }}
  columns={columns}
  pageSizeOptions={[8]}
  initialState={{
    pagination: { paginationModel: { pageSize: 8 } },
  }}
  disableRowSelectionOnClick
  sx={{
    padding: '4px',
    backgroundColor: '#fff',  // White background for the DataGrid
    '& .MuiDataGrid-row:hover': {
      backgroundColor: '#f7f8ff', 
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      color: '#9FA2B4', // Light gray for column header text
    },
    '& .MuiDataGrid-root': {
      backgroundColor: '#fff',  // Ensuring the background color is applied to the root
    },
  }}
/>


          </Container>
             </Box>
             </>
       
      
        
  );
};

export default UsersTable;
