class CreateRecords < ActiveRecord::Migration[5.2]
  def change
    create_table :records do |t|
      t.string :name
      t.float :price
      t.string :category
      t.date :date
      t.string :frequency
      t.string :income_expense
      t.belongs_to :user, index: true

      t.timestamps
    end
  end
end
