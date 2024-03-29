Rails.application.routes.draw do

  resources :projects, only: [:create, :update, :index, :new, :destroy, :edit] do
    resources :tasks, only: [:edit, :create, :update, :destroy]
  end

  post 'projects/:project_id/tasks/:id', to: 'tasks#task_done'
  post 'projects/:project_id/tasks/:id/up', to: 'tasks#priority_up_shifter', as: :shift_up
  post 'projects/:project_id/tasks/:id/down', to: 'tasks#priority_down_shifter', as: :shift_down
  post 'projects/:project_id/new_name', to: 'projects#new_name', as: :new_name
  post 'projects/:project_id/tasks/:id/edit_task', to: 'tasks#edit_task', as: :edit_task
  root 'projects#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
