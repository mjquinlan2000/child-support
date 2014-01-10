class Api::RecordTypesController < ApplicationController
  before_filter :authenticate_user!

  def index
    @record_types = RecordType.all
  end
end
