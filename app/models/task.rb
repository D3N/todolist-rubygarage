class Task < ApplicationRecord
  belongs_to :project
  validates :name, presence: true, length: { maximum: 60 }
end
