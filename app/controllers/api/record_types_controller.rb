class Api::RecordTypesController < ApplicationController
  def index
    @record_types = RecordType.all
  end
end
