class MoveIsSubtracted < ActiveRecord::Migration
  def change
    add_column :client_records, :is_subtracted, :boolean, default: true, null: false
    remove_column :record_types, :is_subtracted
  end
end
