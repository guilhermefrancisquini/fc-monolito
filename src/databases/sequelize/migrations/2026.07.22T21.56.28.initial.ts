import { DataTypes } from "sequelize";
import type { Sequelize } from "sequelize";
import type { MigrationFn } from "umzug";

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
	const queryInterface = sequelize.getQueryInterface();

	await queryInterface.createTable("client", {
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		document: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		street: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		number: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		complement: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		city: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		state: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		zipcode: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	});

	await queryInterface.createTable("products", {
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		salesPrice: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		purchasePrice: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		stock: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	});

	await queryInterface.createTable("invoice", {
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		document: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		street: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		number: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		complement: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		city: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		state: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		zipcode: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	});

	await queryInterface.createTable("invoice_item", {
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		},
		invoice_id: {
			type: DataTypes.STRING,
			allowNull: false,
			references: {
				model: "invoice",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "CASCADE",
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		price: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	});

	await queryInterface.createTable("transactions", {
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		},
		order_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		amount: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		status: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	});

	await queryInterface.createTable("orders", {
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		},
		client_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		client_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		client_email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		client_street: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		client_number: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		client_complement: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		client_city: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		client_state: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		client_zipCode: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		total: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		status: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	});

	await queryInterface.createTable("order_products", {
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		},
		order_id: {
			type: DataTypes.STRING,
			allowNull: false,
			references: {
				model: "orders",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "CASCADE",
		},
		product_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		product_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		product_description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		product_sales_price: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});
};

export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
	const queryInterface = sequelize.getQueryInterface();

	await queryInterface.dropTable("order_products");
	await queryInterface.dropTable("orders");
	await queryInterface.dropTable("transactions");
	await queryInterface.dropTable("invoice_item");
	await queryInterface.dropTable("invoice");
	await queryInterface.dropTable("products");
	await queryInterface.dropTable("client");
};
