class Project < ApplicationRecord
  has_many :tasks, dependent: :destroy
  validates :name, presence: true, length: {minimum: 3, maximum: 50}

  scope :all_projects, -> { all.order(:updated_at).reverse }
end
