'use client';

import { Divider, Grid, Typography } from "@mui/material";

import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis, Tooltip as ChartTooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import PersonPicker from "@/components/pickers/PersonPicker";
import React from "react";
import { Pessoa } from "@/modules/firebase/models/Pessoa";
import LoadingModal from "@/components/loading/LoadingModal";
import PessoasEmptyState from "@/components/common/PessoasEmptyState";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "@/components/auth/AuthContext";
import { PessoaRepo } from "@/modules/firebase/repositories/PessoaRepo";
import DashboardWidget from "./DashboardWidget";
import { Registro } from "@/modules/firebase/models/Registro";
import FrequenciaDiariaChart from "./FrequenciaDiariaChart";
import FrequenciaHorarioChart from "./FrequenciaHorarioChart";
import EventMapWidget from "./EventMapWidget";
import ComportamentosDiariosChart from "./ComportamentosDiariosChart";

export default function UserDashboardPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { userCtx } = useAuthContext();
    const userKind = userCtx.user.profile.userKind!;

    const [loading, setLoading] = React.useState(true);
    const [pessoas, setPessoas] = React.useState<Pessoa[]>([]);
    const [selectedPersonId, setSelectedPersonId] = React.useState('');
    const [registros, setRegistros] = React.useState<Registro[]>([]);

    React.useEffect(() => {
        async function loadPessoas() {
            const repo = new PessoaRepo(userCtx.user);
            const pessoas = await repo.getPessoas();

            setPessoas(pessoas);
            if (pessoas.length > 0) {
                const selectedPersonId = searchParams.get('id') ?? pessoas[0].id;
                setSelectedPersonId(selectedPersonId);
                
                const selectedPerson = pessoas.find(p => p.id === selectedPersonId) ?? pessoas[0];
                const registros = await repo.getRegistros(selectedPerson);

                setRegistros(registros);
            }

            setLoading(false);
        }

        loadPessoas();
    }, [userCtx, searchParams]);

    const handlePersonChange = (person: Pessoa) => {
        setSelectedPersonId(person.id);
        setLoading(true);
        router.replace(`dashboard?id=${person.id}`);
    }

    if (loading) return <LoadingModal />;

    if (pessoas.length === 0) return (
        <>
            <Typography variant="h3" color='primary'>Dashboard</Typography>
            <Divider sx={{ mt: 1, mb: 3 }} />
            <PessoasEmptyState />
        </>
    );

    const selectedPerson = pessoas.find(p => p.id === selectedPersonId) ?? pessoas[0];

    return (
        <>
            <Typography variant="h3" color='primary'>Dashboard</Typography>
            <Divider sx={{ mt: 1, mb: 3 }} />

            <PersonPicker label="Visualizando dados para" pessoas={pessoas} selectedPerson={selectedPerson} userKind={userKind} onChange={handlePersonChange} sx={{ mb: 3 }} />

            <Grid container spacing={2}>
                <FrequenciaDiariaChart data={registros} />
                <FrequenciaHorarioChart data={registros} />
                <EventMapWidget data={registros} />
                <ComportamentosDiariosChart data={registros} />
            </Grid>
        </>
    );
}