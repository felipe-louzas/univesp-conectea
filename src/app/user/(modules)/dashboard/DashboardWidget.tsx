'use client';

import { Box, Card, Divider, FormControl, Grid, IconButton, InputLabel, Menu, MenuItem, Select, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import SettingsIcon from '@mui/icons-material/Settings';


export default function DashboardWidget({ title, children }: { title: string, children?: React.ReactNode }) {

    const [timespan, setTimespan] = useState<number>(7);
    const [configMenuAnchor, setConfigMenuAnchor] = useState<null | HTMLElement>(null);
    const configMenuOpen = Boolean(configMenuAnchor);

    return (
        <Grid item xs={12} lg={6}>
            <Card sx={{ px: 1, pb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" fontWeight='bold'>{title}</Typography>
                    <Tooltip title="Configurações">
                        <IconButton
                            onClick={(e) => setConfigMenuAnchor(e.currentTarget)}
                            size="small"
                        >
                            <SettingsIcon />
                        </IconButton>
                    </Tooltip>
                    <Menu open={configMenuOpen} anchorEl={configMenuAnchor} onClose={() => setConfigMenuAnchor(null)}>
                        <Box sx={{ p: 1 }}>
                            {/* Selecionador de Período de tempo (7 dias, 14 dias, mensal) */}
                            <Box display='flex' flexDirection='row' alignItems='center' gap={2}>
                                <Typography>Período</Typography>
                                <FormControl sx={{ m: 1, minWidth: 120 }} size="small" variant="standard">
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        value={timespan}
                                        label="Age"
                                        onChange={(e) => {
                                            setTimespan(Number(e.target.value));
                                            setConfigMenuAnchor(null);
                                        }}
                                        sx={{ textAlign: 'right'}}
                                    >
                                        <MenuItem value={7}>7 dias</MenuItem>
                                        <MenuItem value={14}>14 dias</MenuItem>
                                        <MenuItem value={30}>30 dias</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>


                        {/* Tipo de gráfico (linha, barra, pizza) */}
                    </Menu>
                </Box>
                <Divider sx={{ mt: 0, mb: 2 }} />
                <Box sx={{ height: '40vh' }}>
                    {children}
                </Box>
            </Card>
        </Grid>

    );
}