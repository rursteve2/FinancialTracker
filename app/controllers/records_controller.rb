class RecordsController < ApplicationController
    before_action :authorize_request
    # before_action :set_record, only: [:show, :update, :destroy]


    # def index
    #     @records = Record.all
    #     render json: @records, status: :ok
    # end

    # def show
    #     render json: @record
    # end

    # def create
    #     @record = Record.new(record_params)
    #     if @record.save
    #       render json: @record, status: :created
    #     else
    #       render json: @record.errors, status: :unprocessable_entity
    #     end
    # end 

    # def update
    #     if @record.update(record_params)
    #       render json: @record
    #     else
    #       render json: @record.errors, status: :unprocessable_entity
    #     end
    # end

    # def destroy
    #     @record.destroy
    # end

    # private

    # def set_record
    #   @record = Record.find(params[:id])
    # end

    # def record_params
    #     params.permit(:name, :price, :category, :frequency, :income_expense, :date)
    # end

    def index
        user = User.find params[:user_id]
        render json: { records: user.records }
    end

    def show
    record = Record.where(user_id: params[:user_id], id: params[:id])
    render json: { record: record }
    end

    def create
    user = User.find params[:user_id]

    user.records << Record.new(record_params)

    render json: { record: user.records.last }
    end

    def update
    record = Record.where(user_id: params[:user_id], id: params[:id])
    record.update record_params
    render json: { record: record }
    end

    def destroy
    record = Record.where(user_id: params[:user_id], id: params[:id])
    record.destroy(params[:id])
    end

    # def get_record_by_date
    #     user = User.find params[:user_id]
    #     @date = params[:date].split('-')
    #     year = Integer(@date[0])
    #     month = Integer(@date[1])
    #     day = Integer(@date[2])
    #     @date_records = user.records.where(date: Date.new(year, month, day))
    #     render json: { recordsByDate: @date_records }
    # end

    # def update_record_by_date

    # end

    private

    def record_params
    params.permit(:name, :price, :category, :frequency, :income_expense, :date)
    end
end
