class TasksController < ApplicationController

  before_action :project_id_finder

  def edit
    @task = @project.tasks.find(params[:id])
  end

  def create
    @task = @project.tasks.create(task_params.merge(priority: @project.tasks.length))
    if @task.save
      redirect_to root_path(@project)
    else
      @task.valid?
      @task.errors.messages
      redirect_to root_path(@project), :flash => { :error => "#{@task.errors.messages}" }
    end
  end

  def update
    @task = Task.find(params[:id])
    @task.update(task_params)
    if @task.save
      redirect_to root_path(@project)
    else
      @task.valid?
      @task.errors.messages
      redirect_to edit_project_task_path(@project), :flash => { :error => "#{@task.errors.messages}" }
    end
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
    shifter(:up)
    redirect_to root_path(@project)
  end

  def priority_down_shifter
    shifter(:down)
    redirect_to root_path(@project)
  end



  private

  def shifter(direction)
    @task = Task.find(params[:id])
    @pair_new_priority = @task.priority

    case direction
    when :up
      @pair_object_priority = @task.priority + 1
    when :down
      @pair_object_priority = @task.priority - 1
    end
    @pair_object = Task.find_by(project_id: @task.project_id, priority: @pair_object_priority)
    
    if @pair_object
      @task.update(priority: @pair_object.priority)
      @pair_object.update(priority: @pair_new_priority)
    end
  end

  def task_params
    params.require(:task).permit(:name, :status, :priority, :deadline)
  end

  def project_id_finder
    @project = Project.find(params[:project_id])
  end

end
