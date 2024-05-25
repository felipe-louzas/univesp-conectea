import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
    return (
        // Horizontal box
        <Link href='/'>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Image src='/logo-appbar.png' alt='Logo' width={66} height={34} />
                <Box sx={{ width: '0.8rem' }} />
                <Typography variant='h3' color='white' component='span'>ConecTEA</Typography>
            </Box>
        </Link>
    );
}