import { HasMany, Column, Model, PrimaryKey, Table } from "sequelize-typescript";
import OrderProductModel from "./order-product.model";

@Table({
  tableName: "orders",
  timestamps: false,
})
export default class OrderModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false, field: "client_id" })
  clientId: string;

  @Column({ allowNull: false, field: "client_name" })
  clientName: string;

  @Column({ allowNull: false, field: "client_email" })
  clientEmail: string;

  @Column({ allowNull: false, field: "client_street" })
  clientStreet: string;

  @Column({ allowNull: false, field: "client_number" })
  clientNumber: string;

  @Column({ allowNull: false, field: "client_complement" })
  clientComplement: string;

  @Column({ allowNull: false, field: "client_city" })
  clientCity: string;

  @Column({ allowNull: false, field: "client_state" })
  clientState: string;

  @Column({ allowNull: false, field: "client_zipCode" })
  clientZipCode: string;

  @Column({ allowNull: false })
  total: number;

  @Column({ allowNull: false })
  status: string;

  @HasMany(() => OrderProductModel)
  products: OrderProductModel[];

  @Column({ allowNull: false, field: "created_at" })
  createdAt: Date;

  @Column({ allowNull: false, field: "updated_at" })
  updatedAt: Date;
}
