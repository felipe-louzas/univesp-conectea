import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { usePathname, useRouter } from 'next/navigation';
import { useAuthContext } from '../auth/AuthContext';
import { UserKind } from '@/modules/firebase/models/UserKind';
import DashboardIcon from '@mui/icons-material/Dashboard';


const drawerWidth = 240;

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function VerticalNavigation(props: Props) {
    const { userCtx } = useAuthContext();
    const router = useRouter();
    const currentPath = usePathname();

    const navigation = [
        { name: 'Dashboard', route: '/user/dashboard', icon: DashboardIcon },
        { name: userCtx.labelPessoas, route: '/user/pessoas/lista', icon: PersonOutlineOutlinedIcon, restrict: [UserKind.PessoaAutista, UserKind.PessoaSemDiagnostico] },
        { name: 'Registros', route: '/user/registros/lista', icon: AssignmentOutlinedIcon },
    ]

    const handleNavigation = (route: string) => {
        props.onClose();

        if (currentPath === route) {
            router.refresh();
        } else {
            router.push(route);
        }
    }

    const filterMenu = (nav: { restrict?: UserKind[] }) => {
        if (!nav.restrict) {
            return true;
        }

        if (nav.restrict.includes(userCtx.user.profile.userKind || UserKind.Guest)) {
            return false;
        }

        return true;
    }

    const navContent = (
        <Box sx={{ overflow: 'auto' }}>
            <List>
                {navigation.filter(filterMenu)
                .map((nav, index) => (
                    <ListItem key={nav.name} disablePadding>
                        <ListItemButton onClick={() => handleNavigation(nav.route)}>
                            <ListItemIcon>
                                <nav.icon />
                            </ListItemIcon>
                            <ListItemText primary={nav.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

        </Box>
    )

    return (
        <>
            <Drawer
                variant="temporary"
                open={props.open}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                onClose={props.onClose}
            >
                <Toolbar />
                {navContent}
            </Drawer>


            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    flexShrink: 0,
                    width: drawerWidth,
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                <Toolbar />
                {navContent}
            </Drawer>
        </>
    )
}
