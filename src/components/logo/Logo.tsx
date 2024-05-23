import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export const Logo = () => {
    return (
        // Horizontal box
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Image src='/logo-appbar.png' alt='Logo' width={66} height={34} />
            <Box sx={{ width: '0.8rem' }} />
            <Typography variant='h3' color='white' component='span'>ConecTEA</Typography>
        </Box>
    );
}