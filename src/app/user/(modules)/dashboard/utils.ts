import { Registro } from "@/modules/firebase/models/Registro";

type HeatmapData = {
    scaleMin: number | undefined;
    scaleMax: number | undefined;
    eventData: (number | null)[][];
}

export function getEventTimeseries(startDate: Date, endDate: Date, registros: Registro[], fillZeros = false) {
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    endDate.setDate(endDate.getDate() + 1);

    const allEvents: Record<string, number> = {};

    const frequencyMap = registros
    .filter(registro => registro.data >= startDate && registro.data < endDate)
    .reduce<Record<number, Record<string, number>>>((acc, registro) => {
        const eventKey = registro.ocorrencia.split(' / ')[1];
        
        allEvents[eventKey] = 0;

        const eventDate = new Date(registro.data);
        eventDate.setHours(0, 0, 0, 0);
        const eventTimestamp = eventDate.getTime();

        if (!acc[eventTimestamp]) {
            acc[eventTimestamp] = {};
        }

        if (!acc[eventTimestamp][eventKey]) {
            acc[eventTimestamp][eventKey] = 0;
        }

        acc[eventTimestamp][eventKey]++;

        return acc;
    }, {});

    const data = [];
    for (const current = startDate; current < endDate; current.setDate(current.getDate() + 1)) {
        const timestamp = current.getTime();
        const events = frequencyMap[timestamp] ?? {};
        data.push({ date: new Date(timestamp).toLocaleDateString(), ...fillZeros ? allEvents : {}, ...events });
    }

    return data;
}

export function getEventHourlyHeatmap(registros: Registro[]) {
    return registros.reduce<Record<string, HeatmapData>>((acc, registro) => {
        const eventKey = registro.ocorrencia.split(' / ')[1];

        const eventDate = new Date(registro.data);
        const eventHour = eventDate.getHours();
        const eventDow = eventDate.getDay() == 0 ? 6 : eventDate.getDay() - 1;

        if (!acc[eventKey]) {
            acc[eventKey] = {
                scaleMin: undefined,
                scaleMax: undefined,
                eventData: Array.from({ length: 7 }, () => Array.from({ length: 24 }, () => null))
            };
        }

        const { scaleMin, scaleMax, eventData } = acc[eventKey];
        
        const value = (eventData[eventDow][eventHour] ?? 0) + 1;
        eventData[eventDow][eventHour] = value;

        if (scaleMin === undefined || value < scaleMin) {
            acc[eventKey].scaleMin = value;
        }

        if (scaleMax === undefined || value > scaleMax) {
            acc[eventKey].scaleMax = value;
        }

        return acc;
    }, {});
}