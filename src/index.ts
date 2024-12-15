import { Reserva, PreciosHabitacion } from "./models/reserva";

class ReservaBase {
    protected subtotal: number = 0;
    protected total: number = 0;
    protected readonly IVA: number = 0.21;

    constructor (
        protected reservas: Reserva[],
        protected precios: PreciosHabitacion
    ) {}

    protected calcularPrecioHabitacion (reserva: Reserva): number {
        return reserva.tipoHabitacion === "standard"
            ? this.precios.standard * reserva.noches
            : this.precios.suite * reserva.noches;
    }

    public calculaSubTotal (): number {
        this.subtotal = this.reservas.reduce(
            (total, reserva) => total + this.calcularPrecioHabitacion(reserva),
            0
        );
        return this.subtotal;
    }

    public calculaTotal (): number {
        this.total = this.subtotal * (1 + this.IVA);
        return this.total;
    }

    public getSubtotal (): number {
        return this.subtotal;
    }

    public getTotal (): number {
        return this.total;
    }
}

export class ReservaParticular extends ReservaBase {
    private readonly CARGO_PERSONA_ADICIONAL = 40;
    private readonly PRECIO_DESAYUNO = 15;

    constructor (reservas: Reserva[]) {
        super(reservas, {
            standard: 100,
            suite: 150,
        });
    }

    protected override calcularPrecioHabitacion (reserva: Reserva): number {
        const precioBase =
            reserva.tipoHabitacion === "standard"
                ? this.precios.standard
                : this.precios.suite;

        const cargoAdicional =
            reserva.pax > 1 ? (reserva.pax - 1) * this.CARGO_PERSONA_ADICIONAL : 0;

        const cargoDesayuno = reserva.desayuno
            ? this.PRECIO_DESAYUNO * reserva.pax
            : 0;

        return (precioBase + cargoAdicional + cargoDesayuno) * reserva.noches;
    }
}

export class ReservaTourOperador extends ReservaBase {
    private readonly DESCUENTO = 0.15;
    private readonly PRECIO_DESAYUNO = 10;

    constructor (reservas: Reserva[]) {
        super(reservas, {
            standard: 100,
            suite: 100,
        });
    }

    protected override calcularPrecioHabitacion (reserva: Reserva): number {
        const precioBase = this.precios.standard;
        const cargoDesayuno = reserva.desayuno
            ? this.PRECIO_DESAYUNO * reserva.pax
            : 0;

        return (precioBase + cargoDesayuno) * reserva.noches;
    }

    public override calculaSubTotal (): number {
        const subtotalSinDescuento = super.calculaSubTotal();
        this.subtotal = subtotalSinDescuento * (1 - this.DESCUENTO);
        return this.subtotal;
    }
}
