class ProjectsController < ApplicationController

  before_action :project_finder, only: [:edit, :update, :destroy, :new_name]

  def index
    @projects = Project.all
  end

  def new
    @project = Project.new
  end

  def create
    @project = Project.create(project_params)
    if @project.save
      redirect_to root_path
    else
      redirect_to new_project_path(@project), :flash => { :error => @project.errors.full_messages }
    end
  end

  def new_name
    @project.update(project_params)
    name = @project.name
    if @project.update(name: name)
      render json: { project: @project }
    else
      redirect_to root_path, :flash => { :error => @project.errors.full_messages }
    end
  end

  def destroy
    @project.destroy
    redirect_to action: 'index'
  end

  private

  def project_params
    params.require(:project).permit(:name, :id)
  end

  def project_finder
    @project = Project.find(params[:id])
  end

end
