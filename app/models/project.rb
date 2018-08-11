class Project < ApplicationRecord
  has_many :tasks, -> { order(position: :asc) }, dependent: :destroy
  validates :name, presence: true, length: {minimum: 3, maximum: 50}
end
