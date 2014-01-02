class Api::ClientsController < ApplicationController
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
end
