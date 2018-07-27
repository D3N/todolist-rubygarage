class TasksController < ApplicationController

  before_action :project_id_finder

	def edit
    @task = @project.tasks.find(params[:id])
	end

	def create
    @task = @project.tasks.create(task_params)
    if @project.tasks.length == 1
      @task.priority = 1
    else
      @task.priority = @project.tasks.last_task_priority
    end
    @task.save
    redirect_to root_path(@project)
	end

	def update
    @task = Task.find(params[:id])
    @task.update(task_params)
    redirect_to root_path(@project)
	end

	def destroy
    @task = @project.tasks.find(params[:id])
    @task.destroy
    redirect_to root_path(@project)
	end

  def task_done
    @task = @project.tasks.find(params[:id])
    @task.update(task_params)
    respond_to do |format|
      format.js {render inline: "location.reload();" }
      end
  end

  def priority_up_shifter
    @task = Task.find(params[:id])
    n = @task.priority
    if @task_2 = Task.find_by(priority:n-1) != nil
      @task_2 = Task.find_by(priority:n-1)
      @task.priority = @task.priority - 1
      @task_2.priority = @task_2.priority + 1
      @task.save
      @task_2.save
    end
    redirect_to root_path(@project)
  end

  def priority_down_shifter
    @task = Task.find(params[:id])
    n = @task.priority
    if @task_2 = Task.find_by(priority:n+1) != nil
      @task_2 = Task.find_by(priority:n+1)
      @task.priority = @task.priority + 1
      @task_2.priority = @task_2.priority - 1
      @task.save
      @task_2.save
    end
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
