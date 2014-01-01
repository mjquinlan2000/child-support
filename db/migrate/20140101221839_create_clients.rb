class CreateClients < ActiveRecord::Migration
  def change
    create_table :clients do |t|
      t.integer :user_id
      t.integer :gender_id
      t.string :name

      t.timestamps
    end
  end
end
