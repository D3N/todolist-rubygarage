class RemovePriorityFromTasks < ActiveRecord::Migration[5.1]
  def change
    remove_column :tasks, :priority, :integer
  end
end
