class Api::SupportScheduleController < ApplicationController
  require 'csv'

  def show
    puts params
    csv_text = File.read('lib/assets/meta/support_schedule_'+params[:year]+'.csv')
    csv = CSV.parse(csv_text, headers: true)
    @support_schedule = []
    csv.each do |row|
      @support_schedule.push row.to_hash
    end
  end
end
