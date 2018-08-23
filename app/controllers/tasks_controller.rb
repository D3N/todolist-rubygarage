class TasksController < ApplicationController

  before_action :project_id_finder

  def edit
    @task = @project.tasks.find(params[:id])
  end

  def create
    @task = @project.tasks.create(task_params)
    if @task.save
      redirect_to root_path(@project)
    else
      redirect_to root_path(@project), :flash => { :error => @task.errors.full_messages }
    end
  end

  def update
    @task = Task.find(params[:id])
    @task.update(task_params)
    if @task.save
      redirect_to root_path(@project)
    else
      redirect_to edit_project_task_path(@project), :flash => { :error => @task.errors.full_messages }
    end
  end

  def destroy
    @task = @project.tasks.find(params[:id])
    @task.destroy
    redirect_to root_path(@project)
  end

  def task_done
    @task = @project.tasks.find(params[:id])
    status = @task.status == 'done' ? 'undone' : 'done'
    if @task.update(status: status)
      render json: {task: @task}
    else
      redirect_to root_path(@project), :flash => { :error => @task.errors.full_messages }
    end
  end

  def priority_up_shifter
    @task = @project.tasks.find(params[:id])
    @task.move_higher
    redirect_to root_path(@project)
  end

  def priority_down_shifter
    @task = @project.tasks.find(params[:id])
    @task.move_lower
    redirect_to root_path(@project)
  end



  private


  def task_params
    params.require(:task).permit(:name, :status, :priority, :deadline)
  end

  def project_id_finder
    @project = Project.find(params[:project_id])
  end

end
