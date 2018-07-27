class Project < ApplicationRecord
 has_many :tasks, dependent: :destroy do
    def last_task_priority
      order(:priority).first.priority - 1
    end
  end

 validates :name, presence: true, length: {minimum: 3, maximum: 50 }

  scope :all_projects, -> { all.order(:updated_at).reverse }
end
