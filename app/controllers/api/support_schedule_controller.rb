class Api::SupportScheduleController < ApplicationController
  require 'csv'

  def show
    csv_text = File.read('lib/assets/meta/support_schedule_2013.csv')
    csv = CSV.parse(csv_text, headers: true)
    @support_schedule = []
    csv.each do |row|
      @support_schedule.push row.to_hash
    end
  end
end
