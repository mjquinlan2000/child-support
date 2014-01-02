class Api::ClientRecordsController < ApplicationController

  def index
    puts 'here!!!'
    @client_records = ClientRecord.where(client_id: params[:client_id])
  end
end
