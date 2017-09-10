# a = "Hua Dai Thang"
# puts a.split
# puts a
# date = "20/11/2017"
# puts date.split("/")
# puts date[3]
# length = date.length
# puts date[0..length]

    # arr = [2, 5, 6, 556, 6, 6, 8, 9, 0, 123, 556]
    # uniqArr = arr.uniq 
    # puts uniqArr.sort
    # $end

# hash_name = {
#     "name1" => "Hua Dai Thang",
#     "name2" => "Hua Dai Cuong",
#     "name3" => "Hua Dai Phong",
# }       

# puts hash_name["name1"]
# puts hash_name["name2"]
# puts hash_name["name3"]

# print "Vui long nhap ten: "
# my_name = gets.chomp
# puts "Ban vua nhap: #{my_name}"

# counter = 1
# arr = ["Thang","Phong","Cuong"]
# # for i in arr 
# #     puts i
# # end
# arr.each_with_index do |e,index|
#     puts "#{index} #{counter}: #{e}"
#     counter += 1
# end

def factors_to_three(n)
    remainder = n % 3
    if remainder == 0
        puts "so #{n} chia het cho 3"
        
    else
        puts "so #{n} Khong chia het cho 3"
    end
    
end
factors_to_three(99)
factors_to_three(45678)
factors_to_three(212)
factors_to_three(3)
