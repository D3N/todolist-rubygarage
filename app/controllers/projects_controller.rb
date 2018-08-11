class ProjectsController < ApplicationController

  before_action :project_finder, only: [:edit, :update, :destroy]

  def index
    @projects = Project.all
  end

  def new
    @project = Project.new
  end

  def edit
  end

  def create
    @project = Project.create(project_params)
    if @project.save
      redirect_to action: 'index'
    else
      redirect_to new_project_path(@project), :flash => { :error => @project.errors.full_messages }
    end
  end

  def update
    @project.update(project_params)
    if @project.save
      redirect_to action: 'index'
    else
      redirect_to edit_project_path(@project), :flash => { :error => @project.errors.full_messages }
    end
  end

  def destroy
    @project.destroy
    redirect_to action: 'index'
  end

  private

  def project_params
    params.require(:project).permit(:name)
  end

  def project_finder
    @project = Project.find(params[:id])
  end

end
