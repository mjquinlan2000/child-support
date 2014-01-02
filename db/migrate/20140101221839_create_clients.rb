class CreateClients < ActiveRecord::Migration
  def change
    create_table :clients do |t|
      t.integer :user_id
      t.integer :gender_id
      t.string :name

      t.integer :income, default: 0
      t.integer :spouse_income, default: 0
      t.integer :maintenance_paid, default: 0
      t.integer :maintenance_received, default: 0
      t.integer :overnights, default: 0
      t.integer :children, default: 1
      t.integer :maintenance_paid, default: 0
      t.integer :maintenance_received, default: 0

      t.timestamps
    end
  end
end
