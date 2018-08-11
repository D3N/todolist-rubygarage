class Task < ApplicationRecord
  belongs_to :project
  acts_as_list scope: :project
  validates :name, presence: true, length: { minimum: 3, maximum: 60 }
end
