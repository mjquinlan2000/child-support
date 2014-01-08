class Api::ClientRecordsController < ApplicationController
  def index
    @client_records = ClientRecord.where(client_id: params[:client_id])
  end

  def create
    @client_record = ClientRecord.create(params[:client_record].merge(client_id: params[:client_id]))
    puts params
    render :show, formats: [:json]
  end

  def update
    @client_record = ClientRecord.find(params[:id])

    @client_record.update_attributes(params[:client_record])

    render :show, formats: [:json]
  end

  def destroy
    @client = ClientRecord.find(params[:id])

    @client.destroy

    respond_to do |f|
      f.json { head :ok }
    end
  end
end
