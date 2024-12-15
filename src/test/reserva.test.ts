import { describe, it, expect } from "vitest";
import { ReservaParticular, ReservaTourOperador } from "../index";
import { Reserva } from "../models/reserva";

describe("ReservaParticular", () => {
    
    it("should calculate subtotal correctly", () => {
        const reservas: Reserva[] = [
            { tipoHabitacion: "standard", desayuno: false, pax: 2, noches: 3 },
            { tipoHabitacion: "suite", desayuno: false, pax: 1, noches: 2 },
            { tipoHabitacion: "standard", desayuno: false, pax: 4, noches: 1 },
        ];
        const reservaHotel = new ReservaParticular(reservas);
        const subtotal = reservaHotel.calculaSubTotal();
        expect(subtotal).toBe(940);
    });

    it("should calculate total correctly", () => {
        const reservas: Reserva[] = [
            { tipoHabitacion: "standard", desayuno: false, pax: 3, noches: 3 },
            { tipoHabitacion: "suite", desayuno: false, pax: 1, noches: 2 },
            { tipoHabitacion: "standard", desayuno: false, pax: 4, noches: 1 },
        ];
        const reservaHotel = new ReservaParticular(reservas);
        reservaHotel.calculaSubTotal();
        const total = reservaHotel.calculaTotal();
        expect(total).toBe(1282.6);
    });
});

describe("ReservaTourOperador", () => {
    it("should calculate subtotal correctly", () => {
        const reservas: Reserva[] = [
            { tipoHabitacion: "standard", desayuno: false, pax: 2, noches: 3 },
            { tipoHabitacion: "suite", desayuno: false, pax: 1, noches: 2 },
            { tipoHabitacion: "standard", desayuno: false, pax: 4, noches: 1 },
        ];
        const tourOperador = new ReservaTourOperador(reservas);
        const subtotal = tourOperador.calculaSubTotal();
        expect(subtotal).toBe(510);
    });

    it("should calculate total correctly", () => {
        const reservas: Reserva[] = [
            { tipoHabitacion: "standard", desayuno: false, pax: 2, noches: 3 },
            { tipoHabitacion: "suite", desayuno: false, pax: 1, noches: 2 },
            { tipoHabitacion: "standard", desayuno: false, pax: 4, noches: 1 },
        ];
        const tourOperador = new ReservaTourOperador(reservas);
        tourOperador.calculaSubTotal();
        const total = tourOperador.calculaTotal();
        expect(total).toBe(617.1);
    });
});
