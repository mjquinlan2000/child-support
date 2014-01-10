class Api::ClientsController < ApplicationController
  before_filter :authenticate_user!

  def index
    @clients = Client.all
  end

  def show
    @client = Client.find(params[:id])
  end

  def create
    @client = Client.create(name: params[:name], gender_id: params[:gender_id])

    render :show, formats: [:json]
  end

  def update
    @client = Client.find(params[:id])

    @client.update_attributes(params[:client])

    render :show, formats: [:json]
  end

  def destroy
    @client = Client.find(params[:id])

    @client.destroy

    respond_to do |f|
      f.json { head :ok }
    end
  end
end
