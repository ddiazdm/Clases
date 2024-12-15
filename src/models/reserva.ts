export interface Reserva {
    tipoHabitacion: "standard" | "suite";
    desayuno: boolean;
    pax: number;
    noches: number;
}

export interface PreciosHabitacion {
    standard: number;
    suite: number;
}

export const reservas: Reserva[] = [
    {
        tipoHabitacion: "standard",
        desayuno: false,
        pax: 1,
        noches: 3,
    },
    {
        tipoHabitacion: "standard",
        desayuno: false,
        pax: 1,
        noches: 4,
    },
    {
        tipoHabitacion: "suite",
        desayuno: true,
        pax: 2,
        noches: 1,
    },
];