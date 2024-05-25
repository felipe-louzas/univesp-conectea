import { Registro } from "@/modules/firebase/models/Registro";
import DashboardWidget from "./DashboardWidget";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getEventTimeseries } from "./utils";
import distinctColors from "distinct-colors";

export default function FrequenciaDiariaChart({ data }: { data: Registro[] }) {
    const chartData = getEventTimeseries(new Date(Date.now() - 24*60*60*1000*6), new Date(), data, true);
    
    const events = chartData.reduce<Record<string, unknown>>((acc, cur) => ({...acc, ...cur}), {});
    delete events.date;

    const colors = distinctColors({count: Object.keys(events).length});

    return (
        <DashboardWidget title="Frequência diária">
            <ResponsiveContainer>
                <LineChart
                    width={500}
                    height={300}
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {Object.keys(events).map((event: string, idx: number) => <Line key={event} type="monotone" dataKey={event} stroke={colors[idx].hex()} />)}
                </LineChart>
            </ResponsiveContainer>
        </DashboardWidget>
    )
}